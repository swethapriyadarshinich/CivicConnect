export const getRepresentatives = async (address: string) => {
  const apiKey = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GOOGLE_CIVIC_API_KEY is missing');
  }
  
  const response = await fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(address)}&key=${apiKey}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch representatives');
  }
  
  return await response.json();
};
