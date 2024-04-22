import { createContext, useContext } from "react";

// Create a context
const RefetchContext = createContext({
    refetchChatboxData: () => {}, // Placeholder function
});

// Export the context provider and consumer hook
export function useRefetchContext() {
    return useContext(RefetchContext);
}

export default RefetchContext;
