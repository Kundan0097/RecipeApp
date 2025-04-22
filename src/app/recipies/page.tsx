import RecipeComponent from "@/components/RecipieComponent";
// import Shimmer from "@/components/shimmer/Shimmer";

const RecipePage = async () => {
  const recipieApi = process.env.NEXT_PUBLIC_RECIPIE_API;
  type Recipe = {
    id: number;
    title: string;
    image: string;
    [key: string]: unknown; // in case there are unknown props
  };
  
  
  if (!recipieApi) {
    throw new Error("API URL is not defined");
  }
  const response = await fetch(recipieApi);
  const data = await response.json(); // The response might be an object
  // console.log("API Response:", data); // Debugging step

  const recipes = Array.isArray(data.recipes) ? data.recipes : []; // Ensure it's an array

  const updatedRecipes = recipes.map((recipe: Recipe) => ({
    ...recipe,
    isPremium: recipe.id > 10,
  }));
  
  
  return <RecipeComponent updatedRecipes={updatedRecipes} />;
};

export default RecipePage;