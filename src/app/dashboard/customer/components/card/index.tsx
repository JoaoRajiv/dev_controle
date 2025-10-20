export function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-200">
      <h2>
        <a href="" className="font-bold">
          Nome:
        </a>{" "}
        Rajiv
      </h2>
      <p>
        <a href="" className="font-bold">
          Email:
        </a>{" "}
        rajiv@teste.com
      </p>
      <p>
        <a href="" className="font-bold">
          Telefone:
        </a>{" "}
        99999-9999
      </p>
      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start hover:bg-red-600 duration-300">
        Deletar
      </button>
    </article>
  );
}
