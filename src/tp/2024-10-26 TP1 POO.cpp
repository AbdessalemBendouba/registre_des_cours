#include <iostream>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char** argv) {
	double a, b;
	char e;
	std::cout	<< "entrez a : " ;
	std::cin	>> a ;
	std::cout	<< "\n"	<< "entrez b : " ;
	std::cin	>> b ;
	std::cout	<< "le resultas est : "	<< a + b ; 
	std::cout	<< "\n"	<< "\n"	<< "appuyez sur un clé de votre clavier puis entré pour avancer";
	std::cin	>> e ;
	
	return 0;
}

