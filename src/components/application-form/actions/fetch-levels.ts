export default async function fetchLevels(): Promise<string[]> {
	const res = await fetch(
		'https://tools.qa.ale.ai/api/tools/candidates/levels'
	);
	if (!res.ok) throw new Error('Failed to load levels');
	const { levels } = await res.json();
	return levels;
}
