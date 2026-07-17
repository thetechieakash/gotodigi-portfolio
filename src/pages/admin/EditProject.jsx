import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import projectService from "../../appwrite/projectService";
import CreateProject from "./CreateProject";

export default function EditProject() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const loadProject = async () => {
            const data = await projectService.getProjectById(id);
            setProject(data);
        };

        loadProject();
    }, [id]);

    if (!project) {
        return <p>Loading...</p>;
    }

    return <CreateProject project={project}/>;
}