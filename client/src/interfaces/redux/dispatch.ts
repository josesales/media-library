import type { PayloadAction } from '@reduxjs/toolkit';

type Dispatch<T> = (action: PayloadAction<T>) => void;

export default Dispatch;
