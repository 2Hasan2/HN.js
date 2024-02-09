import React from "react";

interface Element {
	type: string;
	children?: Element[];
	text?: string;
	onClick?: string;
}

interface MainProps {
	Page: Element[];
	handlePageChange: (updatedPage: any) => void;
}

const Main = ({ Page, handlePageChange }: MainProps) => {
	// Recursive function to create React elements
	const createPageElements = (data: Element[]): JSX.Element[] => {
		return data.map((element, index) => (
			<div key={index}>{element.text}</div>
		));
	};

	return (
		<>
			<main className="flex-1 overflow-y-scroll p-6">
				{createPageElements(Page)}
			</main>
		</>
	);
};

export default Main;
