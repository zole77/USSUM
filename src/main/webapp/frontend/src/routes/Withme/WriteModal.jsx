import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import "../../styles/WriteModal.css";
import axios from "axios";
import defaultProfile from "../../img/defaultProfile.png";

function WriteModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);

    const nextStep = (data) => {
        const updatedFormData = { ...formData, ...data };
        setFormData(updatedFormData);
        console.log("데이터 취합 확인:", updatedFormData);
        setStep(step + 1);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const sendDataToBackend = async () => {
        const data = {
            withMe_pnum: formData.withMe_pnum,
            mem_id: "rabbit@naver.com",
            withMe_x: 31,
            withMe_y: 32,
            withMe_gender: formData.withMe_gender,
            withMe_sdate: formData.withMe_sdate,
            withMe_edate: formData.withMe_edate,
            withMe_title: "ddd",
            withMe_content: "ddd",
        };

        try {
            const formDataToSend = new FormData();
            formDataToSend.append(
                "post",
                new Blob([JSON.stringify(data)], { type: "application/json" })
            );
            if (image) {
                formDataToSend.append("image", image);
            }

            const response = await axios.post("http://localhost:3000/withme/new", formDataToSend);

            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }
            console.log("Backend response:", response.data);

            onClose();
        } catch (error) {
            console.error("Error sending data to backend:", error);
            console.error("Error details:", error.response?.data);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Step1
                        onNext={(startDate, endDate) =>
                            nextStep({ withMe_sdate: startDate, withMe_edate: endDate })
                        }
                    />
                );
            case 2:
                return (
                    <Step2 onNext={(selectedPeople) => nextStep({ withMe_pnum: selectedPeople })} />
                );
            case 3:
                return (
                    <Step3
                        onNext={(selectedGender) => nextStep({ withMe_gender: selectedGender })}
                    />
                );
            case 4:
                return (
                    <Step4
                        onSubmit={(title, content) =>
                            sendDataToBackend({ withMe_title: title, withMe_content: content })
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {renderStep()}
                <input type="file" onChange={handleFileChange} />
            </div>
        </div>
    );
}

export default WriteModal;
