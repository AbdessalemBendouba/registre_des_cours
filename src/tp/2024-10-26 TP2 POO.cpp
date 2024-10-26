#include <iostream>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char** argv) {
	int a, b, c, d, e;
		                                         
	std::cout<<"entrez les nombre a, b et c \n";
	std::cin>>a;
	std::cin>>b;
	//std::cout<<"\n";
	std::cin>>c;
	//std::cout<<"\n";
	if (a >= b) {
		if (c >= a) d = c;
		else d = a;
	}else{
		if (c >= b) d = c;
		else d = b;
	}
	std::cout<<"valeur la plus grande est : "<<d<<"\n";
	std::cin>> e;
	return 0;   
}            
                                                 
                  