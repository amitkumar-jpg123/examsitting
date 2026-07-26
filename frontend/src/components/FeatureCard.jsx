function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:-translate-y-2 transition">

      <div className="text-5xl text-green-600 mb-5">
        {icon}
      </div>

      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-gray-600">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;