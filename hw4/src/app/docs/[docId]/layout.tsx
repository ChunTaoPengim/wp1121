

import HandleChat from "./_components/HandleChat";

type Props = {
  children: React.ReactNode;
  params: { docId: string };
};

async function DocEditorLayout({ children, params }: Props) {
  return (
    <div className="w-full">
      {/* <div className="fixed right-2 top-1 z-50">
      <ShareDialog docId={params.docId} />
      </div> */}
      <div className="w-full flex-col overflow-y-scroll m-4">
       <HandleChat docId={params.docId} />
      </div>
      {children}
      
    </div>

  );
}

export default DocEditorLayout;