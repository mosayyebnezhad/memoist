import { withAuth } from "../HOC/AuthHOC";

const Page = () => { 
    return(
        <div>hello here</div>
    )
}


export default withAuth(Page);