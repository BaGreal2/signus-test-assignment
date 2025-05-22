import { AssignmentFormData } from '../schema/assignment';

export default async function postAssignment(data: AssignmentFormData) {
	const res = await fetch(
		'https://tools.qa.ale.ai/api/tools/candidates/assignments',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}
	);
	if (!res.ok) {
		const { message } = await res.json();
		throw new Error(message ?? 'Submission failed');
	}
	return res.json();
}
