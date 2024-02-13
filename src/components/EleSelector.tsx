import React from "react";

import { Icons } from "./Icon";

const { PencilIcon } = Icons;

const EleSelector = () => {
	return (
		<div className="pointer-events-none absolute inset-0 hidden border-2 border-blue-600 group-focus-within:block">
			<div className="absolute -translate-y-full pl-2">
				<div className="flex items-center gap-x-2 rounded-t-lg bg-blue-600 px-3 py-1 text-white">
					<span className="text-sm">H1 - hero title</span>
					<PencilIcon className="h-4 w-4 fill-current" />
				</div>
			</div>
			<div className="absolute left-0 top-0 h-2 w-2 -translate-x-full -translate-y-full border-2 border-blue-600"></div>
			<div className="absolute right-0 top-0 h-2 w-2 translate-x-full -translate-y-full border-2 border-blue-600"></div>
			<div className="absolute right-0 bottom-0 h-2 w-2 translate-x-full translate-y-full border-2 border-blue-600"></div>
			<div className="absolute left-0 bottom-0 h-2 w-2 -translate-x-full translate-y-full border-2 border-blue-600"></div>
			<div className="absolute inset-x-0 top-0 flex -translate-y-1/2 items-center justify-center">
				<div className="h-2 w-2 border-2 border-blue-600 bg-white"></div>
			</div>
			<div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 items-center justify-center">
				<div className="h-2 w-2 border-2 border-blue-600 bg-white"></div>
			</div>
		</div>
	);
}

export default EleSelector;