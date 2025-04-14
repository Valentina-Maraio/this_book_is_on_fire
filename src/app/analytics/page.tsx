import EsempioPage from "../esempio/page";


export default function AnalyticsPage() {

  const recipe = {
    title: 'Gnocchi alla sorrentina',
    feedback: {
      rating: 4.5,
      reviews: 30
    },
    ingredients: [
      {
        name: '3 potatos',
        prepared: false
      },
      {
        name: 'flower',
        prepared: false,
      },
      {
        name: 'salt',
        prepared: false
      }
    ],
  };

    return (
      <div>
        <h1>Analytics</h1>
        <p>Welcome to your analytics page!</p>
        <h3>From the example page</h3>
        <EsempioPage title={recipe.title} feedback={recipe.feedback} ingredients={recipe.ingredients}/>
      </div>
    )
  }