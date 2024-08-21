import AddPostForm from "./form"
import ImageAccessibility from "./imageAccessibility"
import ImageDnd from "./ImageDnd"

const AddPost = () => {
    return <>
        <h1 className="text-2xl	mt-6">Add a Post</h1>

        <div className="" style={{height: "90%"}}>
            <AddPostForm/>
        </div>
        {/* <div className="grid  grid-cols-2 h-1/2 mt-6">
            <div className="flex justify-center items-center">
                <ImageDnd/>
            </div>
            <div className="flex justify-center items-center">
                <ImageAccessibility/>
            </div>
        </div> */}
    </>
}

export default AddPost