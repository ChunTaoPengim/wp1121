
import { AiFillDelete } from "react-icons/ai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { getchats, deleteChat, getPublication, updatePublication } from "./actions";



type Props = {
    docId: string;
  };
  
async function HandleChat ({ docId }: Props) {
    const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session.user.id;
//  const emails = await getEmails(userId);
 const chats = await getchats(docId);
const publication = await getPublication(docId);
if (!publication[0]) {
  redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/`);
  return null; // or return <></> to render nothing
}


  return (
    <>
        
        <div>公告: {publication[0].publication}</div>
        {chats.map((author, index) => (
      
      <div key={author.id}>

        <form key={index} className="flex w-full gap-2"
        action={async () => {
          "use server";
          await deleteChat(author.id);
          revalidatePath("/docs");
          redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${author.docId}`);
        }}>
            <div className="flex grow flex-col">
            {author.userId === userId ? (
                <section className="text-sm bg-blue-200" >{author.content}</section>
            ) : (
                <section className="text-sm font-semibold bg-gray-100">{author.content}</section>
            )}

            {/* <button type={"submit"}>
                  <AiFillDelete size={16} />
            </button> */}
            {author.userId === userId ? (
                <button type={"submit"}>
                <AiFillDelete size={16} />
          </button>
            ) : (
            <></>
            )}
            </div>
        </form>
        <form  
        action={async () => {
          "use server";
          await updatePublication(docId, author.content);
          revalidatePath("/docs");
          redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${author.docId}`);
        }}>
              <button type={"submit"}>
                設為公告
              </button>
        </form>
      </div>
        ))}
        

        
    </>
  )
}

export default HandleChat