import './Mealtable.css';

function Mealtable({ students }) {
  if (!Array.isArray(students) || students.length === 0) {
    return <p>No student data available.</p>;
  }

  return (
    <>
      <table className="meal-table">
        <thead>
          <tr className="header-row">
            <th>Name</th>
            <th>Meal Type</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
          const type = student.meals?.type;
          let typeDisplay ="Unknown" ;

          if(type === "veg") typeDisplay ="veg";
          else if(type=== "chicken") typeDisplay= "Non-veg(Chicken)";
          else if(type === "fish") typeDisplay= "Non-veg(Fish)";

          return(
              <tr key ={student._id} className='table-row'>
                  <td>{student.name}</td>
                  <td>{typeDisplay}</td>
                  <td>{student.meals?.lunch ? "✅" : "❌" }</td>
                  <td>{student.meals?.dinner ? "✅" : "❌"}</td>
              </tr>
          );
        })}
        </tbody>
      </table>
    </>
  );
}

export default Mealtable;