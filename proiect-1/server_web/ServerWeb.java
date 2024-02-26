import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.io.File;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerWeb {
	public static void main(String[] args) throws IOException {
		System.out.println("#########################################################################");
		System.out.println("Serverul asculta potentiali clienti.");
		// porneČte un server pe portul 5678 
		ServerSocket serverSocket = new ServerSocket(5678);
		FileInputStream fis = null;
		Socket clientSocket = null;
		while(true) {
			try {
				fis = null;
				// aČteaptÄ conectarea unui client la server
				// metoda accept este blocantÄ
				// clientSocket - socket-ul clientului conectat
				clientSocket = serverSocket.accept();
				System.out.println("S-a conectat un client." + clientSocket.toString());
				// socketWriter - wrapper peste fluxul de ieČire folosit pentru a transmite date clientului
				PrintWriter socketWriter = new PrintWriter(clientSocket.getOutputStream(), true);
				// socketReader - wrapper peste fluxul de intrare folosit pentru a primi date de la client
				BufferedReader socketReader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream(), "utf-8"));
				System.out.println("aici1");
				// este cititÄ prima linie de text din cerere
				String linieDeStart = socketReader.readLine();
				System.out.println("aici2");
				if (linieDeStart == null) {
					clientSocket.close();
					System.out.println("S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.");
					continue;
				}
				System.out.println("aici3");
				System.out.println("S-a citit linia de start din cerere: ##### " + linieDeStart + " #####");
				// mesajul citit este transmis la client
				// interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
				String numeResursaCeruta = linieDeStart.split(" ")[1];
				if (numeResursaCeruta.equals("/")) {
					numeResursaCeruta = "/index.html";
				}
				// calea este relativa la directorul de unde a fost executat scriptul
				String numeFisier =  "../continut" + numeResursaCeruta;
				// trimiterea rÄspunsului HTTP
				File f = new File(numeFisier);
				if (f.exists()) {
					String numeExtensie = numeFisier.substring(numeFisier.lastIndexOf(".") + 1);
					String tipMedia;
					switch(numeExtensie) {
						case "html": tipMedia = "text/html"; break;
						case "css": tipMedia = "text/css"; break;
						case "js": tipMedia = "application/js"; break;
						case "png": tipMedia = "image/png"; break;
						case "jpg": tipMedia = "image/jpeg"; break;
						case "jpeg": tipMedia = "image/jpeg"; break;
						case "gif": tipMedia = "image/gif"; break;
						case "ico": tipMedia = "image/x-icon"; break;
						case "xml": tipMedia = "application/xml"; break;
						case "json": tipMedia = "application/json"; break;
						default: tipMedia = "text/plain";
					}
					
					socketWriter.print("HTTP/1.1 200 OK\r\n");
					socketWriter.print("Content-Length: " + f.length() + "\r\n");
					socketWriter.print("Content-Type: " + tipMedia +"\r\n");
					socketWriter.print("Server: My PW Server\r\n");
					socketWriter.print("\r\n");
					socketWriter.flush();
					fis = new FileInputStream(f);
					byte[] buffer = new byte[1024];
					int n = 0;
					while ((n = fis.read(buffer)) != -1) {
						clientSocket.getOutputStream().write(buffer, 0, n);
					}
					clientSocket.getOutputStream().flush();
					fis.close();
				} else {
					// daca fisierul nu exista trebuie trimis un mesaj de 404 Not Found
					String msg = "Eroare! Resursa ceruta " + numeResursaCeruta + " nu a putut fi gasita!";
					System.out.println(msg);
					socketWriter.print("HTTP/1.1 404 Not Found\r\n");
					socketWriter.print("Content-Length: " + msg.getBytes("UTF-8").length + "\r\n");
					socketWriter.print("Content-Type: text/plain; charset=utf-8\r\n");
					socketWriter.print("Server: My PW Server\r\n");
					socketWriter.print("\r\n");
					socketWriter.print(msg);
					socketWriter.flush();
				}
				// ĂŽnchide conexiunea cu clientul
				// la apelul metodei close() se ĂŽnchid automat fluxurile de intrare Či ieČire (socketReader Či socketWriter)
				clientSocket.close();
				System.out.println("S-a terminat comunicarea cu clientul.");
			} catch(Exception e) {
				e.printStackTrace();
			} finally {
				if (fis != null) {
					try {
						fis.close();
					} catch(Exception e) {}
				}
				if (clientSocket != null) {
					try {
						clientSocket.close();
					} catch(Exception e) {}
				}
			}
		}
		// ĂŽnchide serverul
		//serverSocket.close();
	}
}