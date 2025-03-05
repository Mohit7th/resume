import React from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function SkillsBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    const [skills, setSkills] = React.useState(userdata.skills);
    type SkillCategory = keyof typeof skills;

    function updateSkills() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_SKILLS",
                payload: skills,
            });
        }
    }

    function handleSkillsChange(
        _index: number,
        domain: SkillCategory,
        field: string,
        newValue: string
    ) {
        const skillArray = skills[domain];

        // Ensure the block exists and is an array
        if (!Array.isArray(skillArray)) {
            console.error(`Invalid block: ${domain}`);
            return;
        }

        const updatedSkills = skillArray.map((skill, i) =>
            i == _index ? { ...skill, [field]: newValue } : skill
        );

        setSkills((prevSkill) => ({
            ...prevSkill,
            [domain]: updatedSkills,
        }));
    }
    const domainKeys = Object.keys(skills);
    return (
        <div className="update-block">
            <h2>Skills</h2>
            {domainKeys.map((skillKey) =>
                skills[skillKey as SkillCategory].map((tech, index) => (
                    <div key={tech._id} className="skill-item">
                        <label>Skills: </label>
                        <input
                            type="text"
                            value={tech.name}
                            onChange={(e) =>
                                handleSkillsChange(
                                    index,
                                    skillKey as SkillCategory,
                                    "name",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                ))
            )}

            <button onClick={updateSkills}>Update</button>
        </div>
    );
}
