import { IUserRepository } from '../../ports/UserRepository';
import { IEmailService } from '../../ports/EmailService';
import { IRequestPasswordReset } from '../../ports/IUseCases';
/**
 * Use case for requesting a password reset.
 */
export declare class RequestPasswordReset implements IRequestPasswordReset {
    private userRepository;
    private emailService;
    constructor(userRepository: IUserRepository, emailService: IEmailService);
    execute(email: string): Promise<void>;
}
//# sourceMappingURL=RequestPasswordReset.d.ts.map