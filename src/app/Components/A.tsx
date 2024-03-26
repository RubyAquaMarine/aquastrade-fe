// YourComponent.js

import React from "react";
import useDataFetching from "@/app/Hooks/useAnyReadContract";

const A = () => {
  const { data, loading, error } = useDataFetching(
    "https://jsonplaceholder.typicode.com/todos/1",
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      {/* Render your data here */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default A;
