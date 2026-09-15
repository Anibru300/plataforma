export default function KpiCard({ label, value, icon, color = 'bg-p3-blue', subtext = '' }) {
  const IconComponent = icon;
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-lg transition-shadow min-h-[96px] sm:min-h-[120px] h-full">
      <div
        className={`${color} text-white w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-sm shrink-0`}
      >
        <IconComponent className="w-5 h-5 sm:w-7 sm:h-7" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium leading-tight line-clamp-2 min-h-[2.5em]">
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value ?? 0}</p>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );
}
