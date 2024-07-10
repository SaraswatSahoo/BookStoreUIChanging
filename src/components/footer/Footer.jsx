export default function Footer() {
  return (
    <div className="w-full h-[70px] bg-[#ffe300] flex items-center px-4 justify-between">
      <div className="flex items-center">
        <h1 className="text-[25px] font-semibold ml-[60px]">Books</h1>
        <p className="text-[30px] ml-[10px]">|</p>
        <p className=" ml-[10px] text-[15px]">© 2024 books - @ books</p>
      </div>
      <div className="flex justify-between items-center mr-[40px]">
        {/* facebook  */}
        <a className="text-black cursor-pointer">
            <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
            >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
        </a>
        {/* twitter  */}
        <a className="ml-3 text-black cursor-pointer">
            <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
            >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
        </a>
        {/* instagram  */}
        <a className="ml-3 text-black cursor-pointer">
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
            >
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
        </a>
        {/* linkedIn  */}
        <a className="ml-3 text-black cursor-pointer">
            <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0}
                className="w-5 h-5"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />
                <circle cx={4} cy={4} r={2} stroke="none" />
            </svg>
        </a>
      </div>
    </div>
  )
}


