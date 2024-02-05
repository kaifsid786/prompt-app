import PromptCard from "./PromptCard";

export default function Profile({ name, des, data, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        {" "}
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{des}</p>
      <div className="mt-10 prompt_layout">
        {data.map((elm) => {
          return (
            <PromptCard
              key={elm._id}
              post={elm}
              handleEdit={() => handleEdit && handleEdit(elm)}
              handleDelete={() => handleDelete && handleDelete(elm)}
              name={name}
            />
          );
        })}
      </div>
    </section>
  );
}
