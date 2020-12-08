
import ServerResponse from '@/models/ServerResponse';
import Tutorial from '@/models/tutorial';
import { AxiosResponse } from 'axios';
import http from '../config/http-common';

class TutorialService {

    private baseUrl: string;

    constructor() {
        this.baseUrl = '/tutorials';
    }

    public findAll(): Promise<AxiosResponse<Tutorial[]>> {
        return http.get<Tutorial[]>(this.baseUrl);
    }

    public findByTitle(title: string): Promise<AxiosResponse<Tutorial[]>> {
        return http.get<Tutorial[]>(`${this.baseUrl}?title=${title}`);
    }

    public findById(id: string): Promise<AxiosResponse<Tutorial>> {
        return http.get<Tutorial>(`${this.baseUrl}/${id}`);
    }

    public create(tutorial: Tutorial): Promise<AxiosResponse<Tutorial>> {
        return http.post(this.baseUrl, tutorial);
    }

    public update(id: number, tutorial: Tutorial): Promise<AxiosResponse<ServerResponse>> {
        return http.put(`${this.baseUrl}/${id}`, tutorial);
    }

    public deleteById(id: number): Promise<AxiosResponse<ServerResponse>> {
        return http.delete(`${this.baseUrl}/${id}`);
    }

    public deleteAll(): Promise<AxiosResponse<ServerResponse>> {
        return http.delete(this.baseUrl);
    }
}

export default new TutorialService();
