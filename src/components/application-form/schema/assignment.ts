import { z } from 'zod';

export const assignmentSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Must be a valid email address.'),
  assignment_description: z.string().min(10, 'Description must be at least 10 characters.'),
  github_repo_url: z.string().url('Must be a valid URL.'),
  candidate_level: z.string().min(1, 'Please select a candidate level.'),
});
export type AssignmentFormData = z.infer<typeof assignmentSchema>;
