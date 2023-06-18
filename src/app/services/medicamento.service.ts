import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import Medicamento from '../interfaces/medicamento.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  constructor(private firestore: Firestore) { }

  addMedicamento(medicamento: Medicamento) {
    const medicamentoRef = collection(this.firestore, 'medicamentos');
    return addDoc(medicamentoRef, medicamento);
  }

  getAllMedicamentos(): Observable<Medicamento[]> {
    const medicamentoRef = collection(this.firestore, 'medicamentos');
    return collectionData(medicamentoRef, { idField: 'id' }) as Observable<Medicamento[]>;
  }

  deleteMedicamento(medicamento: Medicamento) {
    const medicamentoDocRef = doc(this.firestore, `medicamentos/${medicamento.id}`);
    return deleteDoc(medicamentoDocRef);
  }

  updateMedicamento(medicamento: Medicamento, id: string) {
    const medicamentoDocRef = doc(this.firestore, `medicamentos/${id}`);
    console.log(medicamentoDocRef);
    return updateDoc(medicamentoDocRef, { ...medicamento });
  }

  getMedicamentoById(id: string): Observable<Medicamento | undefined> {
    const medicamentoDocRef = doc(this.firestore, `medicamentos/${id}`);
    console.log(medicamentoDocRef);

    return docData(medicamentoDocRef) as Observable<Medicamento | undefined>;
  }

  getMedicamentoById2(id: string): Observable<Medicamento> {
    const medicamentoRef = doc(this.firestore, 'medicamentos', id);
    return docData(medicamentoRef) as Observable<Medicamento>;
  }
/*   getMedicamentoById(id: string): Observable<Medicamento> {
    return this.firestore.collection('medicamentos').doc(id).valueChanges() as Observable<Medicamento>;
    const medicamentoRef = collection(this.firestore, 'medicamentos');
    return docData(medicamentoRef, id) as Observable<Medicamento>;
  } */

/*   editMedicamento(id: string, data: any): Promise<void> {
    const medicamentoRef = doc(this.firestore, 'empleados', id);
    return updateDoc(medicamentoRef, data);
  } */

}
