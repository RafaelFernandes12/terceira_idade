interface IdProps {
  params: {
    id: string
  }
}

export default function Student({params}: IdProps) {

  return (
    <div>
      <h1>Perfil do aluno</h1>
      <p>{params.id}</p>
    </div>
  );
}