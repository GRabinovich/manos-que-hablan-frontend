"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { listPayments } from "@/redux/features/paymentsSlice";
export const EditPayment = ({
  isOpenWin,
  onClose,

  conceptoUser,
  montoUser,
  diaPagoUser,
  numFacturaUser,
}) => {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  //console.log(isOpen);
  const [concepto, setConcepto] = useState(conceptoUser);
  const [monto, setMonto] = useState(montoUser);
  const [diaPago, setDiaPago] = useState(diaPagoUser);
  const [numFactura, setNumFactura] = useState(numFacturaUser);
  const { paymentsUsers, isLoadingPayments } = useSelector(
    (state) => state.payments
  );
  const dispatch = useDispatch();
  const btnRef = React.useRef();
  useEffect(() => {
    if (montoUser && conceptoUser && diaPagoUser && numFacturaUser) {
      setMonto(montoUser);
      setConcepto(conceptoUser);
      setDiaPago(diaPagoUser);
      setNumFactura(numFacturaUser);
    }
  }, [montoUser, conceptoUser, diaPagoUser, numFacturaUser]);

  const onEdit = () => {
    const newArr = paymentsUsers.map((payment) => {
      if (payment.concepto === conceptoUser) {
        return {
          concepto,
          ["día de pago"]: diaPago,
          monto,
          numFactura,
        };
      }
      return payment;
    });
    console.log(newArr);
    dispatch(listPayments(newArr));
    console.log("Editandooo", monto);
  };
  return (
    <>
      {/* <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button> */}

      <Drawer
        isOpen={isOpenWin}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Editar Pago</DrawerHeader>

          <DrawerBody>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label htmlFor="concepto">Concepto</label>
                  <Input
                    id="concepto"
                    placeholder="Type here..."
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <label htmlFor="monto">Monto</label>
                  <Input
                    id="monto"
                    placeholder="Type here..."
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <label htmlFor="dpago">Dia de pago</label>
                  <Input
                    id="dpago"
                    placeholder="Type here..."
                    value={diaPago}
                    onChange={(e) => setDiaPago(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <label htmlFor="nroFactura">Nro Factura</label>
                  <Input
                    id="nroFactura"
                    placeholder="Type here..."
                    value={numFactura}
                    onChange={(e) => setNumFactura(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              {/* <div style={{ margin: "1rem" }}>sad</div> */}
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={onEdit}>
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
