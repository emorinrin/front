import "../styles/stock-list.css";


const stockData = [
    {
      category: "水・食料品",
      items: [
        { name: "水", quantity: "10L", expiration: "2025-01-01" },
        { name: "お米", quantity: "5kg", expiration: "2024-06-01" },
      ],
    },
    {
      category: "調理補助品",
      items: [
        { name: "ガスコンロ", quantity: "1台", expiration: "なし" },
      ],
    },
    {
      category: "薬・衛生用品",
      items: [
        { name: "簡易トイレ", quantity: "5個", expiration: "なし" },
        { name: "トイレットペーパー", quantity: "10個", expiration: "なし" },
      ],
    },
    {
      category: "日用品",
      items: [
        { name: "懐中電灯", quantity: "1個", expiration: "なし" },
        { name: "乾電池", quantity: "10本", expiration: "2028-01-01" },
        { name: "防災トイレ", quantity: "3個", expiration: "なし" },
      ],
    },
  ];
  
  export default function StockListPage() {
    return (
      <div className="stock-list-container">
        <h1>備蓄品一覧</h1>
        {stockData.map((category, index) => (
          <div key={index} className="category">
            <h2 className="category-title">{category.category}</h2>
            <ul className="item-list">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="item">
                  <div className="item-name">{item.name}</div>
                  <div className="item-details">
                    <span>量: {item.quantity}</span>
                    {item.expiration !== "なし" && (
                      <span>賞味期限: {item.expiration}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  