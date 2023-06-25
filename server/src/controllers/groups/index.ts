import { Response, Request} from "express"
import { IGroup } from "../../types/group"
import Group from "../../models/group"

const getGroups = async (req: Request, res: Response): Promise<void> => {
    try {
        const allGroups: IGroup[] = await Group.find();
        res
            .status(200)
            .json({ 
                groups: allGroups,
            });
    } catch (e) {
        const error = e as Error;
        try {
            res
            .status(400)
            .json({
                errorMessage: error.message,
            });
        } catch (HTTPError) {
            console.log("HTTP error getGroups(): " + HTTPError);
        };
    };
};

const addGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IGroup, "name" | "hostname">;
        const group: IGroup = new Group({
            name: body.name,
            hostname: body.hostname,
        });

        const validateErrMsg = validateGroup(group)
        if (validateErrMsg !== "") {
            throw Error(validateErrMsg);
        };
        
        const groups: IGroup[] = await Group.find();
        const conflictErrMsg = checkGroupConflicts(group, groups);
        if (conflictErrMsg !== "") {        
            throw Error(conflictErrMsg);
        };

        const newGroup: IGroup = await group.save();
        const allGroups: IGroup[] = await Group.find();
        
        res
            .status(201)
            .json({
                message: `Group '${describeGroup(group)}' created`,
                group: newGroup,
                groups: allGroups,
            });
    } catch (e) {
        const error = e as Error;
        try {
            res
            .status(400)
            .json({
                errorMessage: error.message,
            });
        } catch (HTTPError) {
            console.log("HTTP error addGroup(): " + HTTPError);
        };
    };
};

const updateGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req

        const group: IGroup = {
            ...body
        };

        const validateErrMsg = validateGroup(group)
        if (validateErrMsg !== "") {
            throw Error(validateErrMsg);
        };

        const updateGroup: IGroup | null = await Group.findByIdAndUpdate(
            { _id: id},
            body
        );
        const allGroups: IGroup[] = await Group.find();

        res
            .status(200)
            .json({
                message: `Group '${describeGroup(group)}' updated`,
                group: updateGroup,
                groups: allGroups,
            });
    } catch (e) {
        const error = e as Error;
        try {
            res
            .status(400)
            .json({
                errorMessage: error.message,
            });
        } catch (HTTPError) {
            console.log("HTTP error updateGroup(): " + HTTPError);
        };
    };
};

const deleteGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const group: IGroup | null = await Group.findByIdAndRemove(
            req.params.id
        );
        const allGroups: IGroup[] = await Group.find();

        res
            .status(200)
            .json({
                message: `Group '${describeGroup(group)}' deleted`,
                group: group,
                groups: allGroups,
            });
    } catch (e) {
        const error = e as Error;
        try {
            res
            .status(400)
            .json({
                errorMessage: error.message,
            });
        } catch (HTTPError) {
            console.log("HTTP error deleteGroup(): " + HTTPError);
        };
    };
};

const describeGroup = (group: IGroup | null): string => {
    const name = group?.name || ""
    return `${name}`
}

const validateGroup = (group: IGroup): string => {
    if (group.name === "") {
        return "Group validation failed: name is an empty string";
    }
    if (group.hostname === "") {
        return "Group validation failed: hostname is an empty string";
    }
    if (/\s/.test(group.hostname)) {
        return `Group validation failed: hostname '${group.hostname}' contains whitespace characters`;
    }
    return "";
}

const checkGroupConflicts = (group: IGroup, groups: IGroup[]): string => {
    var errMsg = "";
    groups.forEach((g: IGroup) => {
        if (g.name === group.name) {
            errMsg = `Group validation failed: conflict for name '${group.name}' already exists`;
            return;
        };
        if (g.hostname === group.hostname) {
            errMsg = `Group validation failed: conflict for name '${group.hostname}' already exists`;
            return;
        };
    });

    return errMsg;
}

export { getGroups, addGroup, updateGroup, deleteGroup };