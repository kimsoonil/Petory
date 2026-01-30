"use client";

import { MapPin, Activity, Calendar } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "스마트한 산책 기록",
      description:
        "산책 경로와 시간을 자동으로 기록하고, 반려동물의 활동량을 체계적으로 관리하세요.",
    },
    {
      icon: <Activity className="w-8 h-8 text-secondary" />,
      title: "건강 상태 모니터링",
      description:
        "체중, 예방접종, 병원 방문 기록 등 반려동물의 건강 정보를 한눈에 파악하세요.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-500" />,
      title: "일정 관리 & 알림",
      description:
        "중요한 일정과 할 일을 놓치지 않도록 맞춤형 알림을 제공해 드립니다.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            반려동물 케어의 <br className="md:hidden" />
            <span className="text-primary">새로운 기준</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            복잡한 관리는 이제 그만. 펫토리 하나로 모든 것을 간편하게
            해결하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
