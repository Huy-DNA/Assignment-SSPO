import { useRef } from 'react';

function UploadFile({ title, className, fileType, onFileSelected }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileUrl = e.target.result;
        onFileSelected(fileUrl, selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    };
  };

    return (
      <div>
        <button className={className} onClick={handleFileUpload}>{title}</button>
        <input
          type="file"
          accept={`${fileType}/*`}
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelected}
        />
      </div>
    )
  }

  export default UploadFile