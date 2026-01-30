export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="font-bold text-lg text-gray-900">펫토리</span>
        </div>

        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">
            이용약관
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            개인정보처리방침
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            문의하기
          </a>
        </div>

        <p className="text-sm text-gray-400">
          © 2026 Petory. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
