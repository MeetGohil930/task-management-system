export default function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-gray-600 font-medium">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}


// Windows + Shift + S screen shote ke liye