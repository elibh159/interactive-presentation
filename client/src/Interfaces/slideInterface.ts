import { ChangeEventHandler, FormEventHandler } from "react";

export interface Slide {
  id: string;
  sessionId: string;
  question: string;
  hasOpen: boolean;
  priority: number;
  options: Option[] | [];
}

export interface Option {
  name: number;
  value: string;
}

export interface ErrorResponse {
  status?: number;
  message?: string;
}

export interface SlideCreateInput {
  question: string;
  priority: number;
}

export interface SlideListState {
  data: Slide[] | [];
  isLoading: boolean;
  error: ErrorResponse | null;
}

export interface SlideState {
  data?: Slide | null;
  isLoading: boolean;
  error: ErrorResponse | null;
}

export type SlideFormProps = {
  onSubmit: FormEventHandler;
  onChange: ChangeEventHandler;
  buttonText: string;
  values: any;
};