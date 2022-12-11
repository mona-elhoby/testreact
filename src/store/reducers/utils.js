// import {Word} from "../../components/editShowWord/sample-base"

// get file for attachment 
export const getAttachmentData = (fileName, blob, result) => {
		// const blob = await result.data;
			console.log("url: ", fileName,blob)
		console.log(fileName);
		if (['rar', 'zip', 'exe'].includes(fileName.slice(-3))) {
			console.log(fileName.slice(-3));
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement('a');
			link.setAttribute('download', `${fileName}`);
			link.href = url;
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
		} else if (['docx'].includes(fileName.slice(-4))){
			// window.open(Word(result.config.url),'_blank');
		}else {
			// Create blob link to download
			const reader = new FileReader();
			reader.addEventListener("loadend", () => {
				console.log("reader.result: ", reader.result);
			})
			const url = window.URL.createObjectURL(blob);
			const newWindow= window.open(url, '_blank', 'noopener,noreferrer')
			if (newWindow) newWindow.opener = null
		}
};
