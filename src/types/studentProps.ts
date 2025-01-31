import { postCourseProps } from "./courseProps";
import { imgType } from "./imgType";
export interface editStudentProps {
  id?: string;
  name: string;
  cpf: string;
  dataNascimento: string;
  responsavelNome: string;
  responsavelVinculo: string;
  telefoneContato: string;
  telefoneEmergencia: string;
  foto: string | undefined | null;
  vacina: string | undefined | null;
  rgFrente: string | undefined | null;
  rgVerso: string | undefined | null;
  residencia: string | undefined | null;
  cardiologista: string | undefined | null;
  dermatologista: string | undefined | null;
  courseId?: string[];
  courses?: postCourseProps[];
}
export interface getStudentProps {
  id: string;
  name: string;
  cpf: string;
  dataNascimento: string;
  responsavelNome: string;
  responsavelVinculo: string;
  telefoneContato: string;
  telefoneEmergencia: string;
  foto: string | undefined;
  vacina: string | undefined;
  rgFrente: string | undefined;
  rgVerso: string | undefined;
  residencia: string | undefined;
  cardiologista: string | undefined;
  dermatologista: string | undefined;
  courseId?: { id: string; year: string }[];
}

export interface postStudentProps {
  id?: string;
  name: string;
  cpf: string;
  dataNascimento: string;
  responsavelNome: string;
  responsavelVinculo: string;
  telefoneContato: string;
  telefoneEmergencia: string;
  foto: imgType;
  vacina: imgType;
  rgFrente: imgType;
  rgVerso: imgType;
  residencia: imgType;
  cardiologista: imgType;
  dermatologista: imgType;
  courseId?: { id: string; year: string }[];
}
