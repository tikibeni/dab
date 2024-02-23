# Hello-minikube-app

A course assignment regarding Kubernetes and Minikube.

## Install

Make sure you have [set up](https://minikube.sigs.k8s.io/docs/start/) Minikube successfully.

## Run

By first starting Minikube and building the app image

```sh
~/minikube$ minikube start
~/minikube$ cd hello-minikube-app
~/minikube/hello-minikube-app$
~/minikube/hello-minikube-app$ minikube image build -t hello-minikube-app -f ./Dockerfile .
```

After this you can deploy the image to kubectl and expose it

```sh
~/minikube$ kubectl apply -f kubernetes/hello-minikube-app-deployment.yaml 
~/minikube$ kubectl apply -f kubernetes/hello-minikube-app-service.yaml
~/minikube$ minikube service hello-minikube-app-service --url
```

You can access the app via the output URL of the `minikube service` -command.

Finally you can clean up the deployment and the service by:

```sh
~/minikube$ kubectl delete -f kubernetes/hello-minikube-app-service.yaml
~/minikube$ kubectl delete -f kubernetes/hello-minikube-app-deployment.yaml
```
