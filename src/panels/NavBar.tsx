import react from 'react';
import {
	ChevronLeftIcon,
	ChevronDownIcon,
	EyeIcon,
	PackageIcon,
} from "../components/Icon";

const NavBar = () => {
	  return (
		  <header className="flex h-18 items-center justify-center gap-x-6 border-b border-gray-200 bg-white px-8">
			  <button className="flex items-center justify-center rounded-xl bg-gray-100 p-2">
				  <ChevronLeftIcon className="h-6 w-6 stroke-current text-gray-400" />
			  </button>
			  <button className="flex flex-col items-start rounded-xl border border-gray-200 bg-gray-100 px-6 py-2">
				  <div className="flex items-center gap-x-2">
					  <span className="text-sm">Page: Homepage - Dipa</span>
					  <ChevronDownIcon className="h-5 w-5 stroke-current text-gray-400" />
				  </div>
				  <div className="text-xs text-gray-400">
					  https://dipainhouse.com/
				  </div>
			  </button>
			  <button className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-4 py-2">
				  <EyeIcon className="h-6 w-6 stroke-current text-gray-400" />
				  <span className="text-sm font-semibold leading-6">Preview</span>
			  </button>
			  <button className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-4 py-2">
				  <span className="text-sm font-semibold leading-6">
					  960 PX / 100%
				  </span>
				  <ChevronDownIcon className="h-6 w-6 stroke-current text-gray-400" />
			  </button>
			  <button className="flex items-center justify-center rounded-xl bg-gray-100 p-2">
				  <PackageIcon className="h-6 w-6 stroke-current text-gray-400" />
			  </button>
		  </header>
  );
}

export default NavBar;