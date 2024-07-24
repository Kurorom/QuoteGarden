import QuoteCard from "./QuoteCard"

const Profile = ({name, desc, data,posts, handleEdit, handleDelete}) => {
  return (
   <section className="w-full">
      <h1 className="head_text text-left"><span className="green_gradient">{name} Profile</span></h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) =>(
          <QuoteCard 
            key={post.id}
            post={post}
            handleEdit={() => handleEdit && handleEdit (post)}
            handleDelete={()=> handleDelete && handleDelete(post)}
          />
        ))}
      </div>
      <h2 className="mt-10 text-4xl font-extrabold text-left">Liked Posts</h2>
      <div className="mt-10 prompt_layout">
      
      
        {posts.length > 0 ? (
          posts.map((post) => (
            <QuoteCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <p className="text-left">No liked posts found.</p>
        )}
      </div>
    </section>
    
  )
}

export default Profile