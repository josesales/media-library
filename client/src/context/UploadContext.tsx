import { createContext, useContext, type ReactNode } from 'react';
import useUpload from '../hooks/useUpload';
import type Upload from '../interfaces/Upload';

const UploadContext = createContext<Upload | undefined>(undefined);

interface UploadProviderProps {
	children: ReactNode;
}

export const UploadProvider: React.FC<UploadProviderProps> = ({ children }) => {
	const upload = useUpload('/video');

	return (
		<UploadContext.Provider value={upload}>{children}</UploadContext.Provider>
	);
};

/**
 * Context that stores useUpload returned properties.
 * It should be used in order to get any updates made in the these properties reflected in any component
 * @returns Upload
 */
export const uploadContext = (): Upload => {
	const context = useContext(UploadContext);
	if (context === undefined) {
		throw new Error('UploadContext must be used within a UploadProvider');
	}
	return context;
};
