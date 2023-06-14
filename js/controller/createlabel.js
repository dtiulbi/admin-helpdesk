
import { getLabelColor } from "./randomlabel.js";

export function createLabelButton(labelName) {
    const tombol = document.createElement('button');
    tombol.classList.add('label-button');
    tombol.classList.add('bg-blue-500');
    tombol.classList.add('text-white');
    tombol.classList.add('font-bold');
    tombol.classList.add('py-2');
    tombol.classList.add('px-4');
    tombol.classList.add('rounded-full');
    const labelColor = getLabelColor(labelName);
    tombol.style.backgroundColor = labelColor.color;
    tombol.style.margin = labelColor.margin;
    tombol.textContent = labelName;
  
    return tombol;
  }