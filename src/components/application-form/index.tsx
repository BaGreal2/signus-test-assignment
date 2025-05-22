'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import InputField from '../ui/input-field';
import fetchLevels from './actions/fetch-levels';
import postAssignment from './actions/post-assignment';
import { AssignmentFormData, assignmentSchema } from './schema/assignment';

export default function ApplicationForm() {
	const router = useRouter();
	const qc = useQueryClient();

	const {
		data: levels = [],
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ['levels'],
		queryFn: fetchLevels
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: postAssignment,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['levels'] });
			router.push('/thank-you');
		}
	});

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<AssignmentFormData>({ resolver: zodResolver(assignmentSchema) });

	const onSubmit = async (data: AssignmentFormData) => {
		await mutateAsync(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-card flex w-full max-w-lg flex-col space-y-6 rounded-lg p-8 shadow-md"
		>
			<h2 className="text-center text-2xl font-semibold">
				Assignment Submission
			</h2>
			{isError && (
				<p className="text-sm text-red-600">{(error as Error).message}</p>
			)}

			<InputField
				label="Name *"
				{...register('name')}
				error={errors.name?.message}
			/>

			<InputField
				label="Email *"
				type="email"
				{...register('email')}
				error={errors.email?.message}
			/>

			<InputField
				label="Assignment Description *"
				rows={4}
				{...register('assignment_description')}
				error={errors.assignment_description?.message}
			/>

			<InputField
				label="GitHub Repository URL *"
				type="url"
				{...register('github_repo_url')}
				error={errors.github_repo_url?.message}
			/>

			<InputField
				label="Candidate Level *"
				type="select"
				{...register('candidate_level')}
				disabled={isLoading || isError}
				error={errors.candidate_level?.message}
			>
				<option value="">
					{isLoading ? 'Loading levels…' : 'Select a level'}
				</option>
				{levels.map((lvl) => (
					<option key={lvl} value={lvl}>
						{lvl}
					</option>
				))}
			</InputField>

			<button
				type="submit"
				disabled={isPending || isLoading}
				className="bg-primary hover:bg-primary-hover w-full rounded py-3 font-medium text-white transition disabled:opacity-50"
			>
				{isPending ? 'Submitting…' : 'Submit Assignment'}
			</button>
		</form>
	);
}
