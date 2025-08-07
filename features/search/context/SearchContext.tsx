import { createContext, ReactNode, useContext, useState } from "react"

interface SearchContextType {
	searchTerm: string
	setSearchTerm: (term: string) => void
	shouldAutoFocus: boolean
	setShouldAutoFocus: (val: boolean) => void
	justSubmitted: boolean
	setJustSubmitted: (val: boolean) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
	const [searchTerm, setSearchTerm] = useState("")
	const [shouldAutoFocus, setShouldAutoFocus] = useState(true)
	const [justSubmitted, setJustSubmitted] = useState(false)

	return (
		<SearchContext.Provider
			value={{
				searchTerm,
				setSearchTerm,
				shouldAutoFocus,
				setShouldAutoFocus,
				justSubmitted,
				setJustSubmitted,
			}}>
			{children}
		</SearchContext.Provider>
	)
}

export function useSearch() {
	const context = useContext(SearchContext)
	if (context === undefined) {
		throw new Error("useSearch must be used within a SearchProvider")
	}
	return context
}
