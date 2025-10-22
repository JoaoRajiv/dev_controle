export function ModalTicket() {
  return (
    <section className="absolute bg-gray-900/60 w-full min-h-screen">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do chamado
            </h1>
            <button className="bg-red-500 p-1 px-2 text-white rounded">
              Fechar
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p>Problema no pc</p>
          </div>
          <div className="flex flex-wrap flex-col gap-1 mb-2">
            <h2 className="font-bold">Descrição:</h2>
            <p>Teste aqui da descrição</p>
          </div>
        </div>
      </div>
    </section>
  );
}
