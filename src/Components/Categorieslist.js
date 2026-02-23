import { useEffect, useState } from "react";
import './Categorieslist.css'

const CategoriesList = ({isOpen}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/drop/displaylistofcategorydetailsonly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        setError("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("An error occurred while fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`categories-list ${isOpen ? 'open' : ''}`}>
      <h2>Categories List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <table className="categories-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created Date</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.createddate}</td>
                <td>{category.createdby}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoriesList;
