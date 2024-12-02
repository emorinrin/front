export default function CategoryCard({ title, icon }) {
    return (
      <div className="category-card">
        <img src={icon} alt={`${title} アイコン`} />
        <p>{title}</p>
      </div>
    );
  }
  