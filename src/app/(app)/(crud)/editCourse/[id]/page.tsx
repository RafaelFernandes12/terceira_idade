'use client'

import { ErrorText } from '@/components/ErrorText';
import { editCourse } from '@/operations/editCourse';
import { useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import SubmitButton from '../../components/SubmitButton';

const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const types = ['Extensão', 'Ensino']

export default function EditCourse() {
    const [name, setName] = useState('');
    const [courseImg, setCourseImg] = useState<any>();
    const [professorName, setProfessorName] = useState('');
    const [professorImg, setProfessorImg] = useState<any>();
    const [error, setError] = useState('');
    const [type, setType] = useState('Extensão');
    const [id, setId] = useState('')
    const [local, setLocal] = useState({
        date: [],
        hour: '',
        place: ''
    });

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const courseId = pathParts[pathParts.length - 1];
    
        setId(courseId);
    }, []);

    async function addCourse(e: any) {
        e.preventDefault();
        if (name && courseImg && type && local.date.length > 0 && local.hour && local.place) {
            editCourse({ id, name, courseImg, type, professorName, professorImg, local });
            alert('Criado com sucesso');
        } else {
            setError('Todos os campos devem estar preenchidos');
        }
    }

    function handleInputName(value: string) { setName(value); }
    function handleInputProfessorName(value: string) { setProfessorName(value); }
    function handleInputType(value: string) { setType(value); }

    function handleInputChange(propertyName: string, value: any) {
        setLocal(prevLocal => ({
            ...prevLocal,
            [propertyName]: value
        }));
    }

    return (
        <form className='flex flex-col justify-center' onSubmit={addCourse}>
            <h1 className='font-semibold text-2xl my-7'>Criar curso</h1>
            <div className='mb-4'>
                <InputField 
                    label='Nome:' 
                    value={name} 
                    onChange={handleInputName} 
                />

                <input 
                    type='file' 
                    onChange={e => setCourseImg(e.currentTarget.files![0])} 
                />

                <SelectField 
                    inputLabel='Tipo' 
                    value={type} 
                    label='Extensão' 
                    onChange={handleInputType} 
                    itens={types} 
                    isMultiple={false}
                />
                
                <SelectField 
                    inputLabel='Dia' 
                    value={local.date} 
                    label='Dia' 
                    onChange={(e:any) => handleInputChange('date',e.target.value)} 
                    itens={daysOfWeek} 
                    isMultiple={true}
                />

                <InputField 
                    label='Nome do Professor:' 
                    value={professorName}
                    onChange={handleInputProfessorName} 
                 />

                <input 
                    type='file' 
                    onChange={e => setProfessorImg(e.currentTarget.files![0])} 
                />

                <InputField 
                    label='Hora do curso:' 
                    value={local.hour} 
                    onChange={(e: string) => handleInputChange('hour', e)} 
                />
                <InputField 
                    label='Lugar do curso:' 
                    value={local.place} 
                    onChange={(e: string) => handleInputChange('place', e)} 
                />
            </div>
            <SubmitButton submit='submit'/>
            <ErrorText error={error} />
        </form>
    );
}

