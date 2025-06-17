const url = 'data/interest.json';

export async function fetchInterests() {
  try {
    const response = await fetch(url);
    const interests = await response.json();
    return interests;
  } catch (error) {
    console.error('Error fetching interest data:', error);
    return [];
  }
}
