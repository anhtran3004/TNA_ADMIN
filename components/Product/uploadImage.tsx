import Image from "next/image";

export function UploadImage(props: { previewURL: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onClick: () => Promise<void>, downloadUrl: string }) {
    return <div className="pl-5 border-l-4 border-indigo-500">
        <p className="font-bold">Update product Image:</p>
        {props.previewURL && <Image src={props.previewURL} alt="Preview" width={200} height={100}/>}
        <label htmlFor="chooseFile" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2">Chọn
            tệp...</label>
        <input className="hidden" type="file" accept="image/*" id="chooseFile"
               onChange={props.onChange}/>
        <button onClick={props.onClick} className="rounded-md bg-green-600 text-white p-2 mt-2">Upload
            Image
        </button>
        {props.downloadUrl && (
            <p>{props.downloadUrl}</p>
        )}
    </div>;
}