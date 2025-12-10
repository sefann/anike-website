import CountUp from './CountUp.jsx';

export default function HeroStats() {
  return (
    <div className="flex gap-6 md:gap-8 mt-8">
      <div>
        <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">
          <CountUp end={50} suffix="+" />
        </div>
        <div className="text-gray-400 text-xs md:text-sm">Projects</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">
          <CountUp end={30} suffix="+" />
        </div>
        <div className="text-gray-400 text-xs md:text-sm">Clients</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">
          <CountUp end={5} suffix="+" />
        </div>
        <div className="text-gray-400 text-xs md:text-sm">Years</div>
      </div>
    </div>
  );
}












